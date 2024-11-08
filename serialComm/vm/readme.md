# serial communication for scratch3.0

## usage
copy the `vm/scratch3_serialcomm` directory to the `scratch-vm/src/extensions` directory of the scratch3.0 repository.  

scratch-vm/src/extension-support/extension-manager.js 파일에 추가한 확장을 등록한다.  
    
```javascript
const builtinExtensions = {
    // 기존 확장들...
    pen: () => require('../extensions/scratch3_pen'),
    serialcomm: () => require('../extensions/scratch3_serialcomm') // 추가된 부분
};

```
