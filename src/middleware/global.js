const addLocalVariables = (req, res, next) => {
    // Make NODE_ENV avaibale
    res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

    // All req.query
    res.locals.queryParams = {...req.query};

    // Set logged in state
    res.localed.isLoggedIn = false;
    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }

    setHeadAssetsFunctionality(res);

    next();
}

const setHeadAssetsFunctionality = (res) => {
    res.locals.styles = [];
    res.locals.scripts = [];

    res.addStyle = (css, priority = 0) => {
        res.locals.styles.push({ content: css, priority });
    };

    res.addScript = (js, priority = 0) => {
        res.locals.scripts.push({ content: js, priority });
    };

    res.locals.renderStyles= () => {
        return res.locals.styles
            .sort((a, b) => b.priority - a.priority)
            .map(item => item.content)
            .join('\n')
    };

    res.locals.renderScripts= () => {
        return res.locals.scripts
            .sort((a, b) => b.priority - a.priority)
            .map(item => item.content)
            .join('\n')
    };
}

export { addLocalVariables };