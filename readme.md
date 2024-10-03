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
```

만약 확장기능을 추가하지않는 다면 위의과정( scratch-gui )으로 실행하면 된다.  

