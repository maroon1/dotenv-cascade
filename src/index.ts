import appRoot from 'app-root-path';
import dotenv, { DotenvConfigOptions } from 'dotenv';
import expand from 'dotenv-expand';
import fs from 'fs';

export function cascade(options?: DotenvConfigOptions) {
  const defaultDotenvPath = appRoot.resolve('.env');

  const mergedOptions: DotenvConfigOptions = {
    path: defaultDotenvPath,
    ...options,
  };

  const dotenvPath = mergedOptions.path as string;

  const NODE_ENV = process.env.NODE_ENV || 'development';

  const dotenvFilePaths: string[] = [];
  dotenvFilePaths.push(`${dotenvPath}.${NODE_ENV}.local`);
  dotenvFilePaths.push(`${dotenvPath}.${NODE_ENV}`);
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  if (NODE_ENV !== 'test') {
    dotenvFilePaths.push(`${dotenvPath}.local`);
  }
  dotenvFilePaths.push(dotenvPath);

  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  return dotenvFilePaths.forEach(dotenvFilePath => {
    if (fs.existsSync(dotenvFilePath)) {
      expand(
        dotenv.config({
          ...mergedOptions,
          path: dotenvFilePath,
        })
      );
    }
  });
}
