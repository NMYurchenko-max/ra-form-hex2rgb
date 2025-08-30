import React from 'react';
import styles from './Output.module.css';

/**
 * Интерфейс пропсов для компонента Output
 * @interface OutputProps
 * @property {string} rgbColor - RGB строка в формате "rgb(r, g, b)" или пустая строка
 */
interface OutputProps {
    rgbColor: string;
}

/**
 * Компонент Output для отображения результата конвертации
 * @component
 * @param  props - Пропсы компонента OutputProps
 * @returns - Элемент вывода с результатом конвертации
 * 
 * @example
 * <Output rgbColor="rgb(255, 255, 255)" />
 * <Output rgbColor="" />
 */
const Output: React.FC<OutputProps> = ({ rgbColor }) => {
    return (
        <div className={styles.output}>
            {rgbColor ? (
                // Отображаем RGB значение, если конвертация прошла успешно
                <p>{rgbColor}</p>
            ) : (
                // Сообщение-инструкция, если цвет еще не введен
                <p>Введите HEX цвет для конвертации</p>
            )}
        </div>
    );
};

export default Output;
