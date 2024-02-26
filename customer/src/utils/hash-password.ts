import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashText(text: string) {
    return await bcrypt.hash(text, saltRounds);
}

export async function checkTextHash(text: string, hash: string) {
    const match = await bcrypt.compare(text, hash)
    if (!match) {
        throw new Error('Uh oh!');
    }
}