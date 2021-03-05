import React, { useState } from "react";


import './App.scss';
import './styles/global.css';

import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Planning from './pages/Planning.jsx';
import Profile from './pages/Profile.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Info from './pages/Info.jsx';
import DrawerRouterContainer from './components/DrawerRouterContainer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthContext } from "./api/Auth.jsx";

import { AppContext } from './AppContext';
import { countries } from './resources/countries';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import frNumbers from 'cldr-numbers-full/main/fr/numbers.json';
import frLocalCurrency from 'cldr-numbers-full/main/fr/currencies.json';
import frCaGregorian from 'cldr-dates-full/main/fr/ca-gregorian.json';
import frDateFields from'cldr-dates-full/main/fr/dateFields.json';

import usNumbers from 'cldr-numbers-full/main/en/numbers.json';
import usLocalCurrency from 'cldr-numbers-full/main/en/currencies.json';
import usCaGregorian from 'cldr-dates-full/main/en/ca-gregorian.json';
import usDateFields from'cldr-dates-full/main/en/dateFields.json';

import esNumbers from 'cldr-numbers-full/main/es/numbers.json';
import esLocalCurrency from 'cldr-numbers-full/main/es/currencies.json';
import esCaGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import esDateFields from'cldr-dates-full/main/es/dateFields.json';

import { enMessages } from './messages/en-US';
import { frMessages } from './messages/fr';
import { esMessages } from './messages/es';

load(
    likelySubtags,
    currencyData,
    weekData,
    frNumbers,
    frLocalCurrency,
    frCaGregorian,
    frDateFields,
    usNumbers,
    usLocalCurrency,
    usCaGregorian,
    usDateFields,
    esNumbers,
    esLocalCurrency,
    esCaGregorian,
    esDateFields
);

loadMessages(esMessages, 'es');
loadMessages(frMessages, 'fr');
loadMessages(enMessages, 'en-US');

const App = () => {
    const [contextState, setContextState] = React.useState({
        localeId: 'en-US',
        firstName: 'Peter',
        lastName: 'Douglas',
        middleName: '',
        email: 'peter.douglas@progress.com',
        phoneNumber: '(+1) 8373-837-93-02',
        avatar: null,
        country: countries[33].name,
        isInPublicDirectory: true,
        biography: '',
        teamId: 1
    });
    const onLanguageChange = React.useCallback(
        (event) => { setContextState({...contextState, localeId: event.value.localeId}) },
        [contextState, setContextState]
    );
    const onProfileChange = React.useCallback(
        (event) => {
            setContextState({...contextState, ...event.dataItem});
        },
        [contextState, setContextState]
    );

    const [authTokens, setAuthTokens] = useState();
  
    const setTokens = (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    }

    if(authTokens) {
        return (
            <div className="App">
                <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <LocalizationProvider language={contextState.localeId}>
                        <IntlProvider locale={contextState.localeId}>
                            <AppContext.Provider value={{...contextState, onLanguageChange, onProfileChange}}>
                                <HashRouter>
                                    <DrawerRouterContainer>
                                        <Switch>
                                            <PrivateRoute exact={true} path="/" component={Dashboard} />
                                            <Route exact={true} path="/planning" component={Planning} />
                                            <Route exact={true} path="/profile" component={Profile} />
                                            <Route exact={true} path="/info" component={Info} />
                                            <Route path="/login" component={Login} />
                                            <Route path="/signup" component={Signup} />
                                        </Switch>
                                    </DrawerRouterContainer>
                                </HashRouter>
                            </AppContext.Provider>
                        </IntlProvider>
                    </LocalizationProvider>
                </AuthContext.Provider>
            </div>
        );
    } else {
        return (
            <div className="App">
            
            </div>
        );
    }
    
}

export default App;
