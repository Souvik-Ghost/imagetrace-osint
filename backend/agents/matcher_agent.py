from PIL import Image
import imagehash

def compare_images(img1, img2):
    """
    Find visually similar images using perceptual hashing.
    """
    try:
        hash1 = imagehash.phash(Image.open(img1))
        hash2 = imagehash.phash(Image.open(img2))
        similarity = 1 - (hash1 - hash2) / len(hash1.hash)**2
        return similarity
    except Exception as e:
        return {"error": str(e)}
