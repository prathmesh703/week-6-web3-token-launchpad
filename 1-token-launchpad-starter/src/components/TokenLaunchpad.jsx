import { Transaction,SystemProgram, Keypair} from '@solana/web3.js'
import {useConnection, useWallet} from '@solana/wallet-adapter-react'
import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export function TokenLaunchpad() {

    const wallet=useWallet();
    const {connection}=useConnection();

    async function createToken() {
        const keypair=Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId:TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
    );

    transaction.feePayer=wallet.publicKey;
    const recentblockhash=await connection.getLatestBlockhash();
    transaction.recentBlockhash=recentblockhash.blockhash;
    transaction.partialSign(keypair)
    wallet.signTransaction(transaction);
    }

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'></input> <br />
        <input className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button className='btn' onClick={createToken}>Create a token</button>
    </div>
}