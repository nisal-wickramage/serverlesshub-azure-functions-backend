import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getUploadedFile, getUserId } from "../Common/Utils";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    const fileContent = getUploadedFile(req, getUserId(req.headers));

    context.bindings.upload = fileContent;

    context.done();
};

export default httpTrigger;