import React, { useState, useEffect } from 'react';
import Input from '../../shared/Input';
import Output from '../../shared/Output';
import styles from './ConverterForm.module.css';

/**
 * Основной компонент конвертера HEX в RGB
 * @component
 * @returns - Конвертер цветов с полем ввода и выводом результата
 */
const Converter: React.FC = () => {
    // Состояние для хранения введенного HEX цвета
    const [hexColor, setHexColor] = useState<string>('');
    // Состояние для хранения результата конвертации в RGB
    const [rgbColor, setRgbColor] = useState<string>('');
    // Состояние для хранения сообщения об ошибке
    const [error, setError] = useState<string>('');
    // Состояние для хранения дебаунс-значения HEX цвета
    const [debouncedHex, setDebouncedHex] = useState<string>(hexColor);

    /**
     * Обработчик изменения значения в поле ввода HEX цвета
     * @param {string} value - Новое значение из поля ввода
     */
    const handleHexChange = (value: string) => {
        // Закрепляем символ #
        if (!value.startsWith('#')) {
            value = '#' + value;
        }
        setHexColor(value);
    };

    // Эффект для обновления debouncedHex с задержкой 500мс
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedHex(hexColor);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [hexColor]);

    // Эффект для валидации и конвертации при изменении debouncedHex
    useEffect(() => {
        const value = debouncedHex;

        if (value === '#' || value === '') {
            // Пустое поле или только # - сброс состояний
            setRgbColor('');
            setError('');
        } else if (value.length < 7) {
            // Неполный HEX цвет - ошибка
            setRgbColor('');
            setError('Неверный HEX цвет');
        } else if (value.length === 7) {
            const rgb = hexToRgb(value);
            if (rgb) {
                // Успешная конвертация
                setRgbColor(rgb);
                setError('');
            } else {
                // Ошибка конвертации
                setError('Неверный HEX цвет');
                setRgbColor('');
            }
        } else {
            // Если длина больше 7 - считаем ошибкой
            setRgbColor('');
            setError('Неверный HEX цвет');
        }
    }, [debouncedHex]);

    /**
     * Функция конвертации HEX цвета в RGB
     * @param {string} hex - HEX цвет в формате "#FFFFFF"
     * @returns {string | null} RGB строка или null при ошибке
     */
    const hexToRgb = (hex: string): string | null => {
        // Регулярное выражение для проверки формата HEX цвета
        const hexRegex = /^#([A-Fa-f0-9]{6})$/;
        if (!hexRegex.test(hex)) {
            return null;
        }
        
        // Конвертация HEX в число
        const bigint = parseInt(hex.slice(1), 16);
        // Извлечение компонентов RGB
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        
        // Форматирование результата в строку RGB
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div
            className={`${styles.converter} ${error ? styles.errorBackground : ''}`}
            style={{ '--bg-color': rgbColor } as React.CSSProperties}
        >
            <h2>Конвертер HEX в RGB</h2>

            {/* Компонент ввода HEX цвета */}
            <Input value={hexColor} onChange={handleHexChange} placeholder="Введите HEX цвет для конвертации" />

            {/* Отображение ошибки, если есть */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Компонент вывода результата конвертации */}
            <Output rgbColor={rgbColor} />
        </div>
    );
};

export default Converter;
