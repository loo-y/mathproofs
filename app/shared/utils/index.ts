import _ from 'lodash';

// convert image File to base64
export const convertImageFileToBase64 = async ({ imageFile }: { imageFile: File }): Promise<string | null> => {
	// const blob = new Blob([imageFile], { type: fileType })
	const fileType: File['type'] = imageFile?.type || '';
	if (!imageFile || !fileType) return null;
	console.log(`fileType`, fileType);
	return new Promise<string | null>((resolve, reject) => {
		const reader = new FileReader();
		const imageId = Date.now();
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = (error) => {
			// reject(error);
			resolve(null);
		};
		reader.readAsDataURL(imageFile);
	});
};

export const sleepSeconds = async (seconds: number) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
};
