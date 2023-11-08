export function getImageLink(image: string): string {
    let splitImage = image.split('\\');
    let imageLink = `${process.env.BACK_END_IMAGE_LINK}/${splitImage[2]}/${splitImage[3]}`;
    return imageLink
}

