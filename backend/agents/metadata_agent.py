import exifread

def _convert_to_degrees(value):
    """
    Helper function to convert the GPS coordinates stored in the EXIF to decimal degrees.
    """
    try:
        d = float(value.values[0].num) / float(value.values[0].den)
        m = float(value.values[1].num) / float(value.values[1].den)
        s = float(value.values[2].num) / float(value.values[2].den)
        return d + (m / 60.0) + (s / 3600.0)
    except:
        return None

def extract_metadata(image_path):
    """
    Extract metadata like GPS coordinates, camera info, timestamp.
    Returns a standardized dictionary.
    """
    try:
        with open(image_path, 'rb') as f:
            tags = exifread.process_file(f)
            
        metadata = {
            "camera": str(tags.get('Image Make', 'Unknown')),
            "model": str(tags.get('Image Model', 'Unknown')),
            "software": str(tags.get('Image Software', 'None Detected')),
            "timestamp": str(tags.get('Image DateTime', tags.get('EXIF DateTimeOriginal', 'Unknown'))),
        }
        
        # Parse GPS
        lat_ref = tags.get('GPS GPSLatitudeRef')
        lat = tags.get('GPS GPSLatitude')
        lon_ref = tags.get('GPS GPSLongitudeRef')
        lon = tags.get('GPS GPSLongitude')

        if lat and lat_ref and lon and lon_ref:
            lat_val = _convert_to_degrees(lat)
            lon_val = _convert_to_degrees(lon)
            if lat_ref.values[0] != 'N': lat_val = -lat_val
            if lon_ref.values[0] != 'E': lon_val = -lon_val
            metadata["gps"] = {"lat": lat_val, "lng": lon_val}
        else:
            metadata["gps"] = None
            
        return metadata
    except Exception as e:
        return {"error": str(e)}
