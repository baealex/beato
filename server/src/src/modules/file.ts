import fs from 'fs';
import path from 'path';

export function walk(directoryPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            const filePromises = files.map((file) => {
                const filePath = path.join(directoryPath, file);

                return new Promise((resolve, reject) => {
                    fs.stat(filePath, (err, stats) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if (stats.isDirectory()) {
                            walk(filePath)
                                .then(resolve)
                                .catch(reject);
                        } else {
                            resolve(filePath);
                        }
                    });
                });
            });

            Promise.all(filePromises)
                .then((results) => {
                    const filePaths = results.reduce<string[]>((acc, files: string[]) => acc.concat(files), []);
                    resolve(filePaths);
                })
                .catch(reject);
        });
    });
}