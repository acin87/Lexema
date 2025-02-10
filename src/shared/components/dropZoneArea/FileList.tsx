import { FC, memo } from 'react';

export type FileListProps = {
    files: File[];
};

const FileList: FC<FileListProps> = (props) => {
    return (
        <ul>
            {props.files.map((file: File) => (
                <li key={`${file.name}_${file.lastModified}`}>
                    <span>{file.name}</span> <span>({Math.round(file.size / 1000)}kb)</span>
                </li>
            ))}
        </ul>
    );
};

export default memo(FileList);
