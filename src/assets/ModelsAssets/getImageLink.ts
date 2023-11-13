export function getImageLink(image: string, folderName: string): string {
    const backendLink = `${process.env.BACK_END_IMAGE_LINK}/`;
  if (image.includes(backendLink)) {
    return image;
  } else {
      return `${process.env.BACK_END_IMAGE_LINK}/${folderName}/${image}`;
  }

}
