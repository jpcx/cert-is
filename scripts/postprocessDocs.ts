/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see     {@link http://github.com/jpcx/cert-is|GitHub}
 */

/*.----------------------------------------------------------------------------,
 /                                   Usage                                    /

This script tidies up the output from typedoc and integrates module output with
the project root README.md

This script must be executed AFTER doc generation with:
                              typedoc: 0.15.*
              typedoc-plugin-markdown:  2.*.*
  typedoc-plugin-external-module-name:  2.*.*

The script assumes the following conditions:
 - ONLY ONE module is present.
 - README.md is in project root and contains the 'docs' folder.
 - The script location is one directory below the project root.
 - README.md contains a H2 "##" section titled "Documentation"
   - All content until the next H2 "##" section will be replaced.
   - A following H2 section is required.

// ------------------------------------------------------------------------- */

/*.----------------------------------------------------------------------------,
 /                                   Setup                                   */

import * as fs from 'fs';
import * as path from 'path';
/* tslint:disable */
import * as rimraf from 'rimraf';
/* tslint:enable */

/* ---------------------------- MODULE NAME HERE ---------------------------- */
const kModuleName = 'cert-is';
/* -------------------------------------------------------------------------- */

const kModuleFileName = kModuleName.replace(/-/g, '_') + '.md';
const kScriptPath = __dirname;
const kProjectSource = path.join(kScriptPath, '../');
const kDocsPath = path.join(kProjectSource, 'docs');
const kDocsReadmePath = path.join(kDocsPath, 'README.md');
const kDocsGlobalsPath = path.join(kDocsPath, 'globals.md');
const kMainReadmePath = path.join(kProjectSource, 'README.md');
// group 1: name of global link
const kDocGlobalLinkRegex = /\[([^[]+?)\]\(((?:\.\.\/)+)globals\.md/g;
// group 1: name of readme link
const kDocReadmeLinkRegex = /\[([^[]+?)\]\(((?:\.\.\/)+)README\.md/g;
// group 1: name of module link
// group 2: (?:\.\.\/)+ pattern
const kDocModuleLinkRegex = new RegExp(
  '\\[([^[]+?)\\]\\(((?:\\.\\.\\/)+)modules\\/' + kModuleFileName,
  'g'
);
// group 1: first instance of (?:\.\.\/)+
const kDocPostLinkFxRegex = new RegExp(
  '\\[' +
    kModuleName +
    '\\]\\((\\.\\.\\/)+README\\.md\\) › \\[Globals\\]\\((?:\\.\\.\\/)+README\\.md\\) › \\[' +
    kModuleName +
    '\\]\\((?:\\.\\.\\/)+README\\.md\\)',
  'g'
);
// no groups
const kAnyLinkRegex = /\[[^[]+\]\(.+?\)/g;
// group 1: heading hashes
const kHeadingMatcher = /^(#+) +/gm;
const kInsertionPointMatcher = /^## Documentation[\s\S]+?^## /m;

interface IFileContentObject {
  [fpath: string]: string;
}

/*.----------------------------------------------------------------------------,
 /                                   Detail                                  */

const deleteFile = (fpath: string) =>
  new Promise((resolve, reject) => {
    rimraf(fpath, (error?: Error) => {
      if (error !== undefined) {
        resolve();
      } else {
        reject(error);
      }
    });
  });

const fetchDocFiles = async () => {
  const fpaths: string[] = [];
  const recurse = async (dirPath: string) => {
    const files: string[] = await fs.promises.readdir(dirPath);
    for (const f of files) {
      const p = path.join(dirPath, f);
      const stats = await fs.promises.stat(p);
      if (stats.isDirectory()) {
        await recurse(p);
      } else {
        fpaths.push(p);
      }
    }
  };
  await recurse(kDocsPath);
  const result: {
    [path: string]: string;
  } = {};
  for (const p of fpaths) {
    result[p] = await fs.promises.readFile(p, 'utf8');
  }
  if (Object.keys(result).length <= 0) {
    throw Error('No doc files found');
  }
  return result;
};

// modifies: docFiles
const fixDocLinks = (content: string) => {
  let buf = content;
  buf = buf.replace(kDocReadmeLinkRegex, '[$1]($2../README.md');
  buf = buf.replace(kDocGlobalLinkRegex, '[$1]($2../README.md');
  buf = buf.replace(kDocModuleLinkRegex, '[$1]($2../README.md');
  buf = buf.replace(
    kDocPostLinkFxRegex,
    '[' + kModuleName + ']($1../README.md)'
  );
  return buf;
};

const transformDocs = (
  docFiles: IFileContentObject,
  transformer: (content: string) => string
) => {
  for (const [
    key,
    value
  ] of Object.entries(docFiles)) {
    docFiles[key] = transformer(value);
  }
  return docFiles;
};

const fixModuleDocLinks = (text: string) =>
  text.replace(kAnyLinkRegex, match => {
    const link = match.replace(/\[[^[]+\]\((.+?)\)/, '$1');
    // return match if external link
    if (link.match(/:\/\//m)) {
      return match;
    }
    if (link.match(/^(?:\.\.\/)/m)) {
      if (link.match(/^(?:\.\.\/){2,}/m)) {
        throw Error(
          'Unexpected parent depth in module link. Should be at most one level up (../)'
        );
      }
      return match.replace(/(\[[^[]+\]\()\.\.\//, '$1docs/');
    }
    if (link.match(kModuleFileName)) {
      const newLink = link.replace(kModuleFileName, 'README.md');
      return match.replace(link, newLink);
    }
    throw Error('Failed to match sub-pattern in fixModuleDocLinks');
  });

const findDocPathByName = (
  docFiles: {
    [path: string]: string;
  },
  name: string
): string => {
  for (const key of Object.keys(docFiles)) {
    if (path.basename(key) === name) {
      return key;
    }
  }
  throw Error('Cannot find doc file by name: ' + name);
};

const increaseHeadingDepthsByN = (text: string, n: number = 1) => {
  const replacementString = Array(n).fill('#').join('') + '$1 ';
  return text.replace(kHeadingMatcher, replacementString);
};

const removeTooManySpacesInHeaders = (text: string) => {
  return text.replace(kHeadingMatcher, '$1 ');
};

const externalModuleHeaderToModule = (text: string) => {
  return text.replace(/^(#+) External module:/m, '$1 Module:');
};

const insertReadmeCopyData = (readmeText: string, copyData: string) => {
  if (!readmeText.match(kInsertionPointMatcher)) {
    throw Error('README insertion point was not found.');
  }
  return readmeText.replace(
    kInsertionPointMatcher,
    '## Documentation\n\n' + copyData.trim() + '\n\n## '
  );
};

const pipe = (data: any) => {
  let buf: any = data;
  const self = {
    pipe:
      (fn: (...args: any) => any, ...args: any) => {
        buf = fn(buf, ...args);
        return self;
      },
    value: () => buf
  };
  return self;
};

/*.----------------------------------------------------------------------------,
 /                                    Main                                   */

(async () => {
  await deleteFile(kDocsReadmePath);
  await deleteFile(kDocsGlobalsPath);

  const docFiles: IFileContentObject = pipe(await fetchDocFiles())
    .pipe(transformDocs, fixDocLinks)
    .pipe(transformDocs, removeTooManySpacesInHeaders)
    .pipe(transformDocs, externalModuleHeaderToModule)
    .value();

  const mainReadmeFile = await fs.promises.readFile(kMainReadmePath, 'utf8');

  if (mainReadmeFile.length <= 0) {
    throw Error('No README data found');
  }

  const moduleDocPath = findDocPathByName(docFiles, kModuleFileName);

  const readmeCopyData = pipe(docFiles[moduleDocPath])
    .pipe((str: string) => str.split('\n').slice(2).join('\n'))
    .pipe(fixModuleDocLinks)
    .pipe(increaseHeadingDepthsByN, 2)
    .pipe(removeTooManySpacesInHeaders)
    .value();

  const insertionResult = insertReadmeCopyData(mainReadmeFile, readmeCopyData);
  await fs.promises.writeFile(kMainReadmePath, insertionResult, 'utf8');

  await deleteFile(path.dirname(moduleDocPath));

  process.stdout.write('Documentation fixes completed successfully!');
})().catch(e => {
  /* tslint:disable */
  console.error(e);
  /* tslint:enable */
  process.exit(1);
});
