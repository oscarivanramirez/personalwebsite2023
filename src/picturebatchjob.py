from PIL import Image, ExifTags
import os

def correct_orientation(img):
    """
    Corrects the image orientation based on EXIF data.
    """
    try:
        exif = img._getexif()  # Get EXIF data
        if exif is not None:
            exif_dict = dict(exif.items())
            orientation_key = next(key for key, value in ExifTags.TAGS.items() if value == 'Orientation')
            if orientation_key in exif_dict:
                orientation = exif_dict[orientation_key]
                if orientation == 3:
                    img = img.rotate(180, expand=True)
                elif orientation == 6:
                    img = img.rotate(270, expand=True)
                elif orientation == 8:
                    img = img.rotate(90, expand=True)
    except (AttributeError, KeyError, IndexError):
        # Cases: No EXIF data, no orientation tag or error in reading EXIF
        pass
    return img

input_folder = '/Users/oscarramirez/Desktop/updatedPersonalWebsite2023August/cool-website/src/pictures'
output_folder = '/Users/oscarramirez/Desktop/updatedPersonalWebsite2023August/cool-website/src/picturesWebp'
os.makedirs(output_folder, exist_ok=True)  # Ensure the output directory exists

for root, dirs, files in os.walk(input_folder):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png')):
            path = os.path.join(root, file)
            img = Image.open(path)
            img = correct_orientation(img)  # Correct the orientation based on EXIF

            # Resize image to 25% of its original size
            new_size = (int(img.width * 0.25), int(img.height * 0.25))
            img = img.resize(new_size, Image.LANCZOS)
            
            output_path = os.path.join(output_folder, os.path.relpath(root, input_folder))
            os.makedirs(output_path, exist_ok=True)  # Ensure the output directory exists
            img.save(os.path.join(output_path, f'{os.path.splitext(file)[0]}.webp'), 'WEBP', quality=75)

