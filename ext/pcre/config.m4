PHP_ADD_INCLUDE(ext/pcre/pcre2lib)
PHP_NEW_EXTENSION(pcre, php_pcre.c, yes)
PHP_ADD_EXTENSION_DEP(pcre, , true)
