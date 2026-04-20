import exifread

def extract_metadata(image_path):
    """
    Extract metadata like GPS coordinates, camera info, timestamp.
    """
    try:
        with open(image_path, 'rb') as f:
            tags = exifread.process_file(f)
        return tags
    except Exception as e:
        return {"error": str(e)}
