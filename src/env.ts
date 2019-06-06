/*
  Setting default ENVs
*/
export default function env(): void {
  if (!process.env.NODE_PORT) {
    process.env.NODE_PORT = '3000';
  }
}
