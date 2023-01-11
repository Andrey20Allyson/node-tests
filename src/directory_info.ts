import { stat, realpath } from 'fs/promises';
import { exec } from 'child_process';
import { color } from './terminal_color';
import { formatNumber } from './formater';

async function getTotalSize(filePaths: string[]) {
    let totalSize = 0;

    for (const path of filePaths) {
        try {
            const fileStat = await stat(path);
            totalSize += fileStat.size;
        } catch (e) {
            console.log(e);
        }
    }

    return totalSize;
}

function showInfo(result: DirectoryInfoResult) {
    console.log(`Dir name: ${color.green}'${result.path}'${color.white}`);
    console.log('Number of files: %s%s%s', color.yellow, formatNumber(result.numOfFiles, '_'), color.white);
    console.log('Size of dir: %s%s%s Bytes\n', color.yellow, formatNumber(result.size, '_'), color.white);
    console.log(
        'Process has finished in %s ms\n' +
        'Got the data in %s ms\n' +
        'Processed data in %s ms',
        color.yellow + formatNumber(result.time.finish - result.time.start) + color.white,
        color.yellow + formatNumber(result.time.gotData - result.time.start) + color.white,
        color.yellow + formatNumber(result.time.finish - result.time.gotData) + color.white
    );
}

export interface DIRTime {
    start: number;
    gotData: number;
    finish: number;
}

export interface DirectoryInfoResult {
    path: string;
    numOfFiles: number;
    size: number;
    time: DIRTime;
}

function getStdout(command: string) {
    return new Promise<string>((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) reject(err);
            if (stderr) reject(stderr);

            resolve(stdout);
        });
    });
}

function getDirectories(data: string) {
    const directories = data.split('\r\n');
    
    directories.pop();

    return directories;
}

export async function getDirectoryInfo(path: string) {
    const start = Date.now();

    path = await realpath(path);

    const stdout = await getStdout(`dir /b /a-d /s ${path}`);

    const gotData = Date.now();

    const directories = getDirectories(stdout);

    const numOfFiles = directories.length;

    const size = await getTotalSize(directories);

    const finish = Date.now();

    return {
        path,
        numOfFiles,
        size,
        time: {
            start,
            gotData,
            finish
        }
    }
}

export async function showDirectoryInfo(path: string) {
    const info = await getDirectoryInfo(path);

    showInfo(info);
}

