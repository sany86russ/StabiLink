# Руководство по замене изображений в StabiLink

## Способы замены картинок

### 1. Использование файлов из папки attached_assets

Если у вас есть изображения в папке `attached_assets`, замените SVG код на:

```jsx
// Импортируйте изображение в начале файла
import heroImage from "@assets/your-image.png";

// Замените SVG блок на:
<img 
  src={heroImage} 
  alt="Описание картинки" 
  className="w-96 h-72 object-cover rounded-lg"
/>
```

### 2. Добавление новых изображений

1. Скопируйте ваши PNG/JPG файлы в папку `attached_assets/`
2. Импортируйте их в `client/src/pages/home.tsx`:
```jsx
import myHeroImage from "@assets/my-hero-image.png";
import myAboutImage from "@assets/my-about-image.png";
import myTeamImage from "@assets/my-team-image.png";
```

### 3. Где заменить каждую картинку

#### Герой секция (человек с ноутбуком):
**Найдите:** `{/* Right Illustration - Person with Laptop */}`
**Строки:** 157-204
**Замените SVG блок на:**
```jsx
<img 
  src={myHeroImage} 
  alt="Человек с ноутбуком" 
  className="w-96 h-72 object-cover"
/>
```

#### О проекте (безопасность):
**Найдите:** `{/* Right Illustration - Person with Security Shield */}`
**Строки:** 222-288
**Замените весь div с SVG на:**
```jsx
<img 
  src={myAboutImage} 
  alt="Безопасность" 
  className="w-96 h-64 object-cover rounded-full"
/>
```

#### Команда (пара с ноутбуком):
**Найдите:** `{/* Right - Team Illustration */}`
**Строки:** 489-541
**Замените SVG на:**
```jsx
<img 
  src={myTeamImage} 
  alt="Команда" 
  className="w-96 h-72 object-cover rounded-2xl"
/>
```

### 4. Изменение цветов существующих SVG

Вы можете изменить цвета SVG, заменив значения fill:
- `fill="#3B82F6"` - синий цвет рубашки
- `fill="#FBBF24"` - цвет кожи
- `fill="#1E3A8A"` - цвет волос

### 5. Пример полной замены

```jsx
// В начале файла добавьте импорты
import heroImage from "@assets/hero-person.png";
import securityImage from "@assets/security-shield.png";
import teamImage from "@assets/team-photo.png";

// Затем замените соответствующие SVG блоки на:
<img src={heroImage} alt="Hero" className="w-96 h-72" />
<img src={securityImage} alt="Security" className="w-96 h-64" />
<img src={teamImage} alt="Team" className="w-96 h-72" />
```

## Классы стилизации

- `w-96 h-72` - размер 384x288px
- `object-cover` - изображение заполняет контейнер без деформации
- `rounded-lg` - скругленные углы
- `rounded-full` - круглая форма
- `rounded-2xl` - сильно скругленные углы

Все изображения автоматически адаптируются под мобильные устройства!