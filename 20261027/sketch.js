let characterSheet; // 儲存角色的水平精靈圖。
let characterX; // 儲存角色目前的水平位置。
let characterY; // 儲存角色目前的垂直位置。
let facingLeft = false; // 儲存角色目前是否面向左側。
let animationFrame = 0; // 儲存目前要顯示的動畫影格。
let lastFrameTime = 0; // 儲存上次切換動畫影格的時間。
const spriteFrameCount = 12; // 設定精靈圖中的影格數量。
const characterScale = 2; // 設定角色相對於原始影格的顯示倍率。
const moveSpeed = 5; // 設定角色每次繪製時的移動速度。

function preload() { // 在畫布啟動前載入角色圖片。
  characterSheet = loadImage("1/blade/all.png"); // 載入 12 格水平排列的角色精靈圖。
} // 結束圖片載入函式。

function setup() { // 初始化全螢幕畫布與角色位置。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布。
  imageMode(CENTER); // 讓角色圖片以座標中心繪製。
  characterX = width / 2; // 將角色水平位置設在畫布中央。
  characterY = height / 2; // 將角色垂直位置設在畫布中央。
} // 結束初始化函式。

function draw() { // 每一畫格更新背景、動畫與角色位置。
  background("#bde0fe"); // 使用指定的淺藍色清除畫布。
  const isMovingLeft = keyIsDown(LEFT_ARROW) || (mouseIsPressed && mouseButton === LEFT); // 判斷使用者是否正在控制角色向左。
  const isMovingRight = keyIsDown(RIGHT_ARROW) || (mouseIsPressed && mouseButton === RIGHT); // 判斷使用者是否正在控制角色向右。
  if (isMovingLeft) { // 檢查使用者是否正在控制角色向左。
    facingLeft = true; // 設定角色面向左側。
    characterX -= moveSpeed; // 按住左方向鍵或滑鼠左鍵時讓角色向左移動。
  } // 結束左方向鍵判斷。
  if (isMovingRight) { // 檢查使用者是否正在控制角色向右。
    facingLeft = false; // 設定角色面向右側。
    characterX += moveSpeed; // 按住右方向鍵或滑鼠右鍵時讓角色向右移動。
  } // 結束右方向鍵判斷。
  const frameWidth = characterSheet.width / spriteFrameCount; // 根據圖片實際寬度計算單格影格寬度。
  const displayWidth = frameWidth * characterScale; // 計算角色顯示寬度。
  const displayHeight = characterSheet.height * characterScale; // 計算角色顯示高度。
  characterX = constrain(characterX, displayWidth / 2, width - displayWidth / 2); // 限制角色留在畫布水平範圍內。
  characterY = constrain(characterY, displayHeight / 2, height - displayHeight / 2); // 限制角色留在畫布垂直範圍內。
  if (isMovingLeft || isMovingRight) { // 只有使用者正在移動角色時才播放動畫。
    if (millis() - lastFrameTime > 100) { // 每隔 100 毫秒切換一次動畫影格。
      animationFrame = (animationFrame + 1) % spriteFrameCount; // 依序播放影格並在末尾回到第一格。
      lastFrameTime = millis(); // 記錄本次影格切換時間。
    } // 結束動畫計時判斷。
  } else { // 使用者沒有操作時停止播放動畫。
    animationFrame = 0; // 固定顯示第一格作為待機畫面。
    lastFrameTime = millis(); // 重設動畫計時，避免再次操作時跳過影格。
  } // 結束移動狀態判斷。
  push(); // 暫存畫布狀態以套用角色專用的方向變換。
  translate(characterX, characterY); // 將繪圖原點移至角色目前位置。
  if (facingLeft) { // 檢查角色是否需要面向左側。
    scale(-1, 1); // 水平翻轉角色圖片使角色朝左。
  } // 結束面向判斷。
  image(characterSheet, 0, 0, displayWidth, displayHeight, animationFrame * frameWidth, 0, frameWidth, characterSheet.height); // 在角色中心繪製目前的動畫影格。
  pop(); // 還原畫布狀態以避免影響其他繪圖。
} // 結束每畫格繪製函式。

function windowResized() { // 視窗尺寸改變時同步調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 將畫布調整為新的視窗尺寸。
  characterX = constrain(characterX, 0, width); // 讓角色水平位置保持在新畫布範圍內。
  characterY = constrain(characterY, 0, height); // 讓角色垂直位置保持在新畫布範圍內。
} // 結束視窗尺寸調整函式。

function mousePressed() { // 處理滑鼠按鍵事件。
  if (mouseButton === RIGHT) { // 檢查是否按下滑鼠右鍵。
    return false; // 阻止瀏覽器開啟右鍵選單，讓右鍵可用於控制角色。
  } // 結束右鍵判斷。
} // 結束滑鼠按鍵事件函式。
