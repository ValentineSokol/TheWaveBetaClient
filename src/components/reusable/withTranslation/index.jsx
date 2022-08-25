import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PreferencesSlice from '../../../redux/PreferencesSlice';

export default (
  ComponentToTranslate,
  translationKey,
  mapStateToProps,
  mapDispatchToProps = {},
  noLoaders = false,
) => {
  const mapState = (state) => {
    const defaultPayload = {
      language: state.preferences.language,
      translation: state.preferences.translations[translationKey],
    };
    return mapStateToProps ? {
      ...mapStateToProps(state),
      ...defaultPayload,
    } : defaultPayload;
  };
  const mapDispatch = {
    ...mapDispatchToProps,
    loadTranslationForComponent: PreferencesSlice.loadTranslationForComponent,
  };

  class TranslationProvider extends Component {
    componentDidMount() {
      const { language } = this.props;
      if (!language) return;
      this.loadTranslation();
    }

    componentDidUpdate(prevProps) {
      const { language } = this.props;
      if (prevProps.language === language) return;
      this.loadTranslation();
    }

    loadTranslation() {
      const { loadTranslationForComponent, language } = this.props;
      loadTranslationForComponent({ translationKey, language });
    }

    render() {
      const { translation } = this.props;
      const componentProps = { ...this.props };
      delete componentProps.loadTranslationForComponent;
      delete componentProps.language;
      return (
        translation || noLoaders
        // eslint-disable-next-line react/jsx-props-no-spreading
          ? <ComponentToTranslate {...componentProps} />
          : <p>Loading....</p>
      );
    }
  }
  return connect(mapState, mapDispatch)(TranslationProvider);
};
