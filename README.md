# DRFS
Decentralized Record Filing System

Full disclosure: The project is clunky AF but we made it work. It would have been better if we used ethereum instead of the Stacks blockchain becuase tbh Stacks sucks. 

Overview of the architecture:
A MERN application is being used to communicate with a Clarity backend. The server-side APIs call the blockchain backend to fetch and upload data. Simple CRUD operations really. The blockchian backend executes the smart contracts that have been written up in clarity. A dockerized instance of a dev backend is run to simulate the blockchain and the MERN application communicates with that.
