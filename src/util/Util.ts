import { sha256 } from 'js-sha256';

export function hashSha256WithSalt(input: string): string {
  const salt = 'abcdxyz';
  const hashHex = sha256(input + salt);
  const hashBuffer = Buffer.from(hashHex, 'hex');
  const base64 = hashBuffer.toString('base64');
  const base64url = base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return base64url;
}
