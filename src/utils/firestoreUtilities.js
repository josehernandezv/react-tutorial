export const getIdFromName = name => {
    const parts = name.split('/');
    return parts[parts.length - 1];
}

export const getArrayFromDocuments = (documents = []) => {
    return documents.map(doc => getObjectFromDocument(doc));
}

export const getObjectFromDocument = document => {
    const values = {};
    for (let field in document.fields) {
        values[field] = getValueFromField(document.fields[field])
    }
    console.log(values)
    const id = document.name ? getIdFromName(document.name) : null;
    return {
        id,
        ...values,
        // title: document.fields.title.stringValue,
        // date: new Date(document.fields.date.timestampValue),
        // players: []
    }
}

export const getValueFromField = field => {
    for (let key in field) {
        switch(key) {
            case 'timestampValue': return new Date(field[key]);
            case 'stringValue': return field[key];
            case 'arrayValue': 
                console.log(field[key].values)
                const array = field[key].values.map(item => getObjectFromDocument(item.mapValue));
                return array;
            default: return field[key]
        }
    }
}

export const formatDocumentFromArray = array => {
    return {
        fields: {
            players: {
                arrayValue: {
                    values: [
                        ...array.map(item => {
                            return {
                                mapValue: {
                                    fields: {
                                        playerName: {
                                            stringValue: item.playerName
                                        },
                                        playerId: {
                                            stringValue: item.playerId
                                        },
                                    }
                                }
                            }
                        })
                    ]
                }
            }
        }
    }
}