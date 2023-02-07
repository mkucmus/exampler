import { Project } from '@stackblitz/sdk';

export function getStackBlitzProjectConfig({
  packageName,
  packageVersion,
  functionName,
  isAsync,
  multiImport,
  functionToRunAfterImport,
  paramsConfig,
}: {
  packageName: string;
  packageVersion?: string;
  functionName: string;
  isAsync: boolean;
  multiImport?: string;
  functionToRunAfterImport?: string;
  paramsConfig: any;
}): Project {
  const INDEX_HTML_TEMPLATE = (title?: string) => `
<html>
    <h1>${title ? title : 'Hello frontends!'}</h1>
    <div>
        <pre id="output"></pre>
    </div>
</html>
`;

  const destructureImports = () => multiImport;
  const getFunctionToRun = () => {
    if (!multiImport) {
      return functionName;
    }

    if (
      functionToRunAfterImport &&
      multiImport.includes(functionToRunAfterImport)
    ) {
      return functionToRunAfterImport;
    }

    return multiImport.split(',').shift();
  };

  const INDEX_TS_TEMPLATE = () => `
import { ${functionName} } from "${packageName}";

async function runTest() {
  const outputContainer = document.getElementById("output");
  try {
    const ${!multiImport ? 'result' : destructureImports()} = ${
    isAsync ? 'await ' : ''
  }${getFunctionToRun()}(${paramsConfig ? JSON.stringify(paramsConfig) : ''});
  
    outputContainer.innerText = JSON.stringify(result, null, 2);
  } catch (error) {
    console.error('An error occured while running example: ', error);
    outputContainer.innerText = "An error occured. Check the debug console to see the details.";
  }
}

runTest();
`;
  return {
    title: `${packageName} > ${functionName} example`,
    description: `Example of using ${packageName} > ${functionName} function`,
    template: 'typescript',
    files: {
      'index.html': INDEX_HTML_TEMPLATE(),
      'index.ts': INDEX_TS_TEMPLATE(),
    },
    dependencies: {
      [packageName]: packageVersion || 'latest',
    },
  };
}
