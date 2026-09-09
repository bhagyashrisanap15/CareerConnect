import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("ENCRYPTION_KEY environment variable is not defined");
  }
  // Ensure the key is 32 bytes (256 bits)
  return crypto.createHash("sha256").update(String(key)).digest();
};

export const encryptData = (plaintext) => {
  if (plaintext === null || plaintext === undefined) return null;
  const text = typeof plaintext === "string" ? plaintext : JSON.stringify(plaintext);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getEncryptionKey();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  // Format: iv:authTag:encryptedData
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

export const decryptData = (encryptedString) => {
  if (!encryptedString || typeof encryptedString !== "string") return null;
  try {
    const parts = encryptedString.split(":");
    if (parts.length !== 3) {
      throw new Error("Invalid encrypted string format");
    }

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const key = getEncryptionKey();

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.error("Decryption error:", error.message);
    throw new Error("Failed to decrypt data: Invalid ciphertext or key mismatch");
  }
};
