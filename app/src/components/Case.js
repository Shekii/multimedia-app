import React, {Component} from 'react';

import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import * as constants from './static/constants.js';

import CaseConcepts from './CaseConcepts';
import CaseConceptsRow from './CaseConceptsRow';

import CaseCategories from './CaseCategories';
import CaseCategoryRow from './CaseCategoryRow';

import CaseEmotions from './CaseEmotions';
import CaseEmotionsRow from './CaseEmotionsRow';

import '../css/main.css';

class Case extends Component {

    constructor(props) {
        super(props);

        this.state = {
             dataCollection:[],
             concepts:[],
             categories:[],
             emotions:[]
        }
    }
    async componentDidMount() {
        //WatsonDiscovery
        const tempCollection = [];

        let fetchURL = '/cases_discovery/case/' + this.props.match.params.id;
        await fetch(constants.API + fetchURL)
            .then(res => res.json())
            .then(item => {
                tempCollection.push(item);
                this.setState({ dataCollection: tempCollection[0].data[0]});
            })
            .catch((error) => {
                console.error(error);
            });

            let data = this.state.dataCollection;
            let caseConcepts = [];

            data.enriched_text.concepts.forEach(it => {
                caseConcepts.push(<CaseConceptsRow
                    key={Math.random()}
                    title={it.text}
                    relevance={Math.round(it.relevance * 100)}

                />);
            });

            let caseCategories = [];
            data.enriched_text.categories.forEach(it => {
                caseCategories.push(<CaseCategoryRow
                    key={Math.random()}
                    label={it.label}
                    score={Math.round(it.score * 100)}

                />);
            });

            let caseEmotions = [];
            caseEmotions.push(<CaseEmotionsRow
                    key={Math.random()}
                    disgust={Math.round(data.enriched_text.emotion.document.emotion.disgust*100)}
                    joy={Math.round(data.enriched_text.emotion.document.emotion.joy*100)}
                    anger={Math.round(data.enriched_text.emotion.document.emotion.anger*100)}
                    fear={Math.round(data.enriched_text.emotion.document.emotion.fear*100)}
                    sadness={Math.round(data.enriched_text.emotion.document.emotion.sadness*100)}

                />);

            this.setState ({emotions: caseEmotions});
            this.setState ( {categories: caseCategories});
            this.setState ({concepts: caseConcepts});

    }

  render() {
    return (
        <div className="container">
            
            <BreadcrumbsItem to='#'>Cases</BreadcrumbsItem>
            <BreadcrumbsItem to='/manage'>{this.state.dataCollection.caseName}</BreadcrumbsItem>
            <h4>Case Name: <small>{this.state.dataCollection.caseName}</small></h4>
            <h4>Case Date: <small>{this.state.dataCollection.caseDate}</small></h4>
            <div className="caseTextView">
                <p><small>{this.state.dataCollection.text}</small> </p>
            </div>

            <CaseConcepts concepts={this.state.concepts}/>
            <CaseCategories categories={this.state.categories}/>
            <CaseEmotions emotions={this.state.emotions}/>
            
            <h3>Similar Cases</h3>
        </div>
    );
  }

}

export default Case;
