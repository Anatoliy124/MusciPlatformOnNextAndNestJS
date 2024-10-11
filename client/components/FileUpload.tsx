import React, { useRef } from 'react';

interface FileUploadProps {
    setfile: Function;
    accept: string;
}

const FileUpload: React.FC<FileUploadProps> = ({setfile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfile(e.target.files[0])
    }

    return (
        <div onClick={() => ref.current.click()}>
                <input  
                type="file" 
                accept={accept}
                style={{display: "none"}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div> 
    )
}

export default FileUpload;