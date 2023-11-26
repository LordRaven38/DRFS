;; nft-minting
;; <contract for minting property record as NFTs by LDA>

;; ---------- Global Variables ----------

;;Principle of Admin, needed to check that only the LDA/Admin mints record.

(define-constant admin-principal 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
(define-constant admin-principalalt 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)

;; Failed to mint error
(define-constant Failed-to-mint-error (err u1) )
;;Unauthorized Principal error
(define-constant Unauthorized-principal (err u2) )

;;Unauthorized token owner error
(define-constant err-not-token-owner (err u101))


;; data maps and vars
;; Mapping data for the record information
(define-map record-data 
    ;; ERR: Public Data, as all maps are public
    {record-id: uint}
    {record-hash: (buff 64), token-uri: (string-ascii 64), web3-link: (string-ascii 64)}
)

(define-map pending-transfers {token-id: uint } { sender: principal, rec: principal}
)

;; defining non-fungible token for record, uint is the identifier type (the primary key)
(define-non-fungible-token record-nft uint)

;; setting token-id of the NFT
(define-data-var curr-token-id uint u1)

;; ---------- private functions ----------

;; Registering the token, the new-owner will be the owner to whom the record is accredited
(define-private (register-token (new-owner principal) (token-id uint))
    (begin
      (unwrap! (nft-mint? record-nft token-id new-owner) false)
    )
)

;;Check Owner
(define-private (is-owner (actor principal) (token-id uint))
  (is-eq actor
    (unwrap! (nft-get-owner? record-nft token-id) false)
  )
)


;; ---------- public functions ----------

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get curr-token-id)))


;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (token-id uint))
  ;; Make sure to replace record-nft
  (ok (nft-get-owner? record-nft token-id)))

;; minting the nft on blockchain
(define-public (mint 
(owner principal)
  (record-hash (buff 64))
  (token-uri (string-ascii 64))
  (web3-link (string-ascii 64))
) 
    (let
        (
            (token-id (+ (var-get curr-token-id) u1))
        )

        (asserts! (or (is-eq tx-sender admin-principal) (is-eq tx-sender admin-principalalt)) Unauthorized-principal)
        (asserts! (register-token owner token-id) Failed-to-mint-error)
          (map-set record-data
            {record-id: token-id}
            {record-hash: record-hash, token-uri: token-uri, web3-link: web3-link}
          )
        (var-set curr-token-id token-id)
        (ok true)
    )
)

;;To be called by the owner
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
    (begin
        (asserts! (is-owner sender token-id) err-not-token-owner)
        (map-set pending-transfers {token-id: token-id} {sender: sender, rec: recipient} )
        (ok true)
    )
)

;;To be called by the admin
(define-public (execute-transfer (token-id uint))
  (begin
    (asserts! (is-eq tx-sender admin-principal) Unauthorized-principal)

    (let ((transaction (unwrap! (map-get? pending-transfers {token-id: token-id}) (err u1) )))
    (try! (nft-transfer? record-nft token-id (get sender transaction) (get rec transaction)))
    (map-delete pending-transfers {token-id: token-id})

    (ok true)

    )
  )
)

;; Fetch record-hash
(define-read-only (get-record-hash (token-id uint))
    (unwrap-panic (get record-hash (map-get? record-data {record-id: token-id})))
)

;; Fetch web3-Link
(define-read-only (get-gaia-link (token-id uint))
    (unwrap-panic (get web3-link (map-get? record-data {record-id: token-id})))
)

;; Fetch record-data
(define-read-only (get-record-data (token-id uint))
    (unwrap-panic (map-get? record-data {record-id: token-id}))
)

;;To get all pending transfers
(define-read-only (get-transaction-data (token-id uint))
    (unwrap-panic (map-get? pending-transfers {token-id: token-id}))
)



