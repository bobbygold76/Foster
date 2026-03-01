# How to Add Your Photos to the Portfolio

## Current Status
Your website is now working with placeholder elements. To add your actual photos, follow these steps:

## Method 1: Replace Hero Avatar
1. Copy your main profile photo to: `images/foster_profile_1.jpg`
2. In `index.html`, replace this line:
   ```html
   <div class="avatar-placeholder">
       <span class="avatar-initials">FEA</span>
   </div>
   ```
   With:
   ```html
   <img src="images/foster_profile_1.jpg" alt="Foster Etonam Akoto" class="hero-image">
   ```

## Method 2: Replace Gallery Photos
1. Copy your 3 additional photos to:
   - `images/foster_profile_2.jpg`
   - `images/foster_profile_3.jpg` 
   - `images/foster_profile_4.jpg`

2. In `index.html`, replace the gallery placeholders:
   ```html
   <!-- Replace this -->
   <div class="gallery-placeholder">
       <span class="gallery-icon">📸</span>
       <span class="gallery-text">Photo 1</span>
   </div>
   
   <!-- With this -->
   <img src="images/foster_profile_2.jpg" alt="Foster Etonam Akoto - Photo 2" class="gallery-image">
   ```

## Image Recommendations
- **Hero Image**: Square format, high quality, professional headshot
- **Gallery Images**: Any format, will be cropped to fit
- **File Size**: Keep under 500KB each for fast loading
- **Format**: JPG or PNG

## Alternative: Use Different Names
If your images have different names, update the `src` attribute in the HTML:
```html
<img src="images/your_photo_name.jpg" alt="Description" class="hero-image">
```

## After Adding Images
1. Refresh your browser at `http://localhost:8000`
2. Your photos should now appear instead of placeholders
3. Test on different screen sizes to ensure they look good

## Need Help?
If images still don't appear:
1. Check file names match exactly
2. Ensure images are in the `images/` folder
3. Check file extensions (.jpg, .png, etc.)
4. Make sure images aren't corrupted
