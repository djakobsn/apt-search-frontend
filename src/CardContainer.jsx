import ArticleCard from './ArticleCard';

export default function CardContainer({article_cards}) {
    return (
        <main id="article-card-container">
            {article_cards.map(e => <ArticleCard details={e} />)}
        </main>
    );
}
