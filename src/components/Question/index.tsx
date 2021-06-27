import { ReactNode } from 'react'
import cx from 'classnames';

import './styles.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}


// criando componente de pergunta
export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
}: QuestionProps) {
    return (
        <div className={cx(
            'question',
            { answered: isAnswered },
            { highlighted: isHighlighted && !isAnswered},
            )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name}/>
                    <span>{author.name}</span>
                </div>

                {/* Conteúdo depende de onde a página é renderizada (adm ou user) */}
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}