from PIL import Image
import imagehash

def get_image_fingerprint(image_path):
    """
    Generate a perceptual hash (digital fingerprint) for the image.
    """
    try:
        # Load image and compute hash
        img = Image.open(image_path)
        phash = imagehash.phash(img)
        return str(phash)
    except Exception as e:
        return f"Error: {str(e)}"

def calculate_similarity(hash1_str, hash2_str):
    """
    Compare two pHash strings and return similarity float (0.0 to 1.0).
    """
    try:
        h1 = imagehash.hex_to_hash(hash1_str)
        h2 = imagehash.hex_to_hash(hash2_str)
        # Hamming distance normalized
        diff = h1 - h2
        similarity = 1 - (diff / len(h1.hash)**2)
        return similarity
    except:
        return 0.0
