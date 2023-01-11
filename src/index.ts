import { showDirectoryInfo } from './directory_info';
import { getFlag } from './utils';
import { argv } from 'process';

const dir = getFlag(argv, 'd') ?? '.';

showDirectoryInfo(dir);