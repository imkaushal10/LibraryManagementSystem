module.exports = {
    mongodbMemoryServerOptions:{
        instance:{
            dbName: 'LMS'
        },
        binary: {
            versions: '4.2.0',
            skipMD5: true
        },
        autostart: false

    }
}