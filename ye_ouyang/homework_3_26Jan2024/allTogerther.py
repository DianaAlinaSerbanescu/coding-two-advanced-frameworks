import pygame
import random

# 激活函数
def sign(n):
    return 1 if n >= 0 else -1

# 感知器类
class Perceptron:
    def __init__(self):
        self.weights = [random.uniform(-1, 1) for _ in range(2)]  # 两个权重
        self.lr = 0.1  # 学习率
    
    def guess(self, inputs):
        sum = 0
        for input, weight in zip(inputs, self.weights):
            sum += input * weight
        return sign(sum)
    
    def train(self, inputs, target):
        guess = self.guess(inputs)
        error = target - guess
        for i in range(len(self.weights)):
            self.weights[i] += error * inputs[i] * self.lr

# 点类
class Point:
    def __init__(self, width, height):
        self.x = random.uniform(0, width)
        self.y = random.uniform(0, height)
        self.label = 1 if self.x > self.y else -1

# 初始化感知器和点
def setup(width, height):
    brain = Perceptron()
    points = [Point(width, height) for _ in range(100)]
    return brain, points

# 用于训练感知器的函数
def mouse_pressed(brain, points):
    for pt in points:
        inputs = [pt.x, pt.y]
        brain.train(inputs, pt.label)

# pygame初始化
pygame.init()
width, height = 800, 800
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('Perceptron Visualization')
clock = pygame.time.Clock()

# 初始化感知器和点
brain, points = setup(width, height)

# 游戏循环标志
running = True
while running:
    # 控制事件循环
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            mouse_pressed(brain, points)
    
    # 填充屏幕背景
    screen.fill((255, 255, 255))

    # 绘制点和感知器的分类结果
    for pt in points:
        inputs = [pt.x, pt.y]
        guess = brain.guess(inputs)
        color = (0, 255, 0) if guess == pt.label else (255, 0, 0)
        pygame.draw.circle(screen, color, (int(pt.x), int(pt.y)), 8)
    
    # 更新屏幕显示
    pygame.display.flip()

    # 控制游戏循环更新速度
    clock.tick(60)

# 退出pygame
pygame.quit()
