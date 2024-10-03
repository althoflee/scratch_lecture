## node.js 설치하기

nvm을 이용해서 node.js를 설치한다.  

windows 에서는 nvm-windows를 사용한다.  
[nvm 다운로드 받는곳](https://github.com/coreybutler/nvm-windows/releases)

```bash
nvm install lts

node -v # 버전확인

# 만약 경로를 찾을수 없다고 나오면 버전을 수동으로 활성화 시킨다.
nvm use lts

nvm list # 설치된 버전 확인
```


## 스크래치 소스 다운받기

```bash
git clone https://github.com/gbox3d/scratch-vm.git
git clone https://github.com/gbox3d/scratch-gui.git

```

## 스크래치 소스 실행하기

### scratch-vm 실행하기

gui 와 vm 중 에서 vm을 먼저 실행한다. 다음에 gui를 실행한다.   

```bash
# vm 실행
cd scratch-vm
npm install # 처음 한번만 실행
npm run build 
nom link  # 이 저장소를  전역적으로 scratch-vm이라는 이름으로 패키지를 사용힐수 있게 한다.
```

### 스크래치 gui 실행하기

```bash
cd scratch-gui
npm install # 처음 한번만 실행
npm run build
npm link scratch-vm # 원래 package.json 에 있는 scratch-vm 대신에 위에서 링크한 패키지(scratch-vm)를 사용하게 한다. 

npm start
```

만약 확장기능을 추가하지않는 다면 위의과정( scratch-gui )으로 실행하면 된다.  

### 확장기능 추가하기

확장기능을 추가하기 위해서는 scratch-vm을 수정해야 한다.  
원하는 scratch3_확장이름 을 만들고 그안에 index.js 파일을 만든다.  

예>
scratch-vm/src/extensions/scratch3_hello/index.js

```javascript
const BlockType = require('../../extension-support/block-type');

class Scratch3HelloBlocks {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'hello',
            name: 'Hello',
            blocks: [
                {
                    opcode: 'sayHello',
                    blockType: BlockType.REPORTER,
                    text: 'say hello'
                }
            ]
        };
    }

    sayHello (args, util) {
        return 'hello';
    }
}

module.exports = Scratch3HelloBlocks;
    
```
