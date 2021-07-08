import fs from "fs";
import path from "path"
import env from "../../env"
/*eslint-disable */
const PDFParser = require("pdf2json");
const pdf2pic = require("pdf2pic");
/*eslint-enable */
const { fromPath } = pdf2pic;

function getPDFSize(pdfPath: string): Promise<{ width: number; height: number }> {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
        const buffer = fs.readFileSync(pdfPath);
        const pdfParser = new PDFParser();
        pdfParser.parseBuffer(buffer);

        pdfParser.on('pdfParser_dataError', (errData: { parserError: string }) => {
            reject(errData.parserError);
        });

        pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
            if (typeof pdfData.formImage !== 'object' ||
                !('Pages' in pdfData.formImage) ||
                !Array.isArray(pdfData.formImage.Pages)) {
                reject('Unable to parse PDF');
            }

            // 25를 곱하여 단위를 픽셀로 변환.
            resolve({
                width: Math.round(pdfData.formImage.Width * 25),
                height: Math.round(pdfData.formImage.Pages[0].Height * 25),
            });
        });
    });
}

async function generatePreview(pdfPath: string): Promise<string> {
    const pathPrefix = path.join(env.filesDirectory, "pdf-preview");
    const pngName = path.basename(pdfPath);
    const previewPath = path.join(pathPrefix, `${pngName}.1.png`);

    if (!fs.existsSync(previewPath)) {
        fs.mkdirSync(pathPrefix, { recursive: true });
        const pdfSize = await getPDFSize(pdfPath);

        const option = {
            density: 600,
            saveFilename: pngName,
            savePath: pathPrefix,
            format: "png",
            width: pdfSize.width,
            height: pdfSize.height
        };

        const storeAsImage = fromPath(pdfPath, option);
        await storeAsImage(1);
    }

    return previewPath;
}

export default generatePreview;