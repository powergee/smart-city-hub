const getUTCDate = ():Date => {
    const current = new Date();
    return new Date(current.getUTCDate())
};

const metaType = {
    createdAt: { type: Date, default: getUTCDate() },
    modifiedAt: { type: Date, default: getUTCDate() }
};

export default { metaType }