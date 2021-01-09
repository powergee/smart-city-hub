import { Binary } from 'mongodb';

interface collectionInfo {
    name: string,
    type: string,
    options: Record<string, unknown>,
    info: {
        readOnly: boolean,
        uuid: Binary,
    },
    idIndex: {
        v: number,
        key: Record<string, unknown>,
        name: string,
    },
}

export { collectionInfo as CollectionInfo }