using Azure.Core;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "";
        private readonly string _endPoint = "";

        public async Task<String> RecognizeTextAsync(Stream imgStream)
        {
            try
            {
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endPoint
                };

                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imgStream);

                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception e)
            {

                return e.Message;
            }

        }
        private static string ProcessRecognitionResult(OcrResult result)
        {
            string recognizedText = "";
            foreach (var region in result.Regions)
            {
                foreach (var line in region.Lines)
                {
                    foreach (var word in line.Words)
                    {
                        recognizedText += word.Text + " ";
                    }
                    recognizedText += "\n";
                }
            }
            return recognizedText;
        }
    }


}
