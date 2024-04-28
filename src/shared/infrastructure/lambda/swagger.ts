import { readFileSync } from "fs";
import openApi from "../../../../doc/openapi.json";

const applicationName = "My Awesome Application";
import { APIGatewayProxyEvent } from "aws-lambda";

const EVENTS = {
  GET_JSON: "/swagger.json",
  GET_UI: "/swagger",
};

export const handler = async (event: APIGatewayProxyEvent): Promise<any> => {
  switch (event.path) {
    case EVENTS.GET_JSON:
      return {
        statusCode: 200,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(openApi),
      };
    case EVENTS.GET_UI:
      const body = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${applicationName}</title>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
        </head>
        <body>
            <div id="swagger"></div>
            <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
            <script> 
                SwaggerUIBundle({
                dom_id: '#swagger',
                url: '/dev/swagger.json'
            });
            </script>
        </body>
        </html>`;

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
        },
        body: body,
      };
    default:
      return {
        statusCode: 200,
        headers: {
          "content-type": "application/json",
        },
        body: readFileSync("../../../../openapi.json"),
      };
  }
};
