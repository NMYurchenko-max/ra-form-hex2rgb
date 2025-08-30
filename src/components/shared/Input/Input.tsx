import React from 'react';
import styles from './Input.module.css';

/**
 * Интерфейс пропсов для компонента Input
 * @interface InputProps
 * @property {string} value - Текущее значение ввода
 * @property {(value: string) => void} onChange - 
 * Функция обратного вызова при изменении значения
 */
interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/**
 * Компонент Input для ввода HEX цвета
 * @component
 * @param {InputProps} props - Пропсы компонента
 * @returns {JSX.Element} Элемент ввода
 * 
 * @example
 * <Input value="#FFFFFF" onChange={(value) => console.log(value)} />
 */
const Input: React.FC<InputProps> = ({ value, onChange }) => {
    /**
     * Обработчик изменения значения в поле ввода
     * @param {React.ChangeEvent<HTMLInputElement>} event - Событие изменения
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="#FFFFFF" // Плейсхолдер показывает ожидаемый формат
            maxLength={7} // Максимальная длина HEX цвета с решеткой
            className={styles.input} // Стили из CSS модуля
        />
    );
};

export default Input;
