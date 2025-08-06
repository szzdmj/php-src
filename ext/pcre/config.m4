PHP_ARG_ENABLE(pcre, whether to enable PCRE support,
[  --enable-pcre           Enable PCRE support], yes)

if test "$PHP_PCRE" != "no"; then
  PHP_NEW_EXTENSION(pcre, php_pcre.c, yes)
  PHP_ADD_BUILD_DIR(ext/pcre/pcre2lib, 1)
  PHP_ADD_INCLUDE(ext/pcre/pcre2lib)  # <-- 关键补充这一行！

  dnl Explicitly include PCRE2 sources, but exclude JIT
  PCRE2_SOURCES="
    pcre2lib/pcre2_auto_possess.c
    pcre2lib/pcre2_compile.c
    pcre2lib/pcre2_config.c
    pcre2lib/pcre2_context.c
    pcre2lib/pcre2_convert.c
    pcre2lib/pcre2_dfa_match.c
    pcre2lib/pcre2_error.c
    pcre2lib/pcre2_extuni.c
    pcre2lib/pcre2_find_bracket.c
    pcre2lib/pcre2_maketables.c
    pcre2lib/pcre2_match.c
    pcre2lib/pcre2_match_data.c
    pcre2lib/pcre2_newline.c
    pcre2lib/pcre2_ord2utf.c
    pcre2lib/pcre2_pattern_info.c
    pcre2lib/pcre2_script_run.c
    pcre2lib/pcre2_serialize.c
    pcre2lib/pcre2_string_utils.c
    pcre2lib/pcre2_study.c
    pcre2lib/pcre2_substitute.c
    pcre2lib/pcre2_substring.c
    pcre2lib/pcre2_tables.c
    pcre2lib/pcre2_ucd.c
    pcre2lib/pcre2_valid_utf.c
    pcre2lib/pcre2_xclass.c
  "

  PHP_ADD_SOURCES(pcre, $PCRE2_SOURCES)
fi
