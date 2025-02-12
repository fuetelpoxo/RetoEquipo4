<?php
use PhpCsFixer\{
    Config, Finder,
};

$finder = Finder::create()
    ->in(__DIR__ . '/app')
    ->in(__DIR__ . '/routes')
    ->ignoreDotFiles(true)
    ->exclude('vendor');

return (new Config)->setRules([
    '@PSR12' => true,
    '@PSR12:risky' => true,
    '@PHP82Migration' => true,
    '@PHP80Migration:risky' => true,
    'array_syntax' => ['syntax' => 'short'],
    'binary_operator_spaces' => ['operators' => ['=>' => 'align_single_space_minimal']],
    'blank_line_after_opening_tag' => true,
    'blank_line_before_statement' => ['statements' => ['break', 'continue', 'declare', 'return', 'throw', 'try']],
    'braces' => ['allow_single_line_closure' => true, 'position_after_anonymous_constructs' => 'same', 'position_after_control_structures' => 'same', 'position_after_functions_and_oop_constructs' => 'next'],
    'cast_spaces' => ['space' => 'single'],
    'class_attributes_separation' => ['elements' => ['method' => 'one']],
    'class_definition' => ['single_line' => true],
    'concat_space' => ['spacing' => 'one'],
    'declare_equal_normalize' => ['space' => 'single'],
    'function_typehint_space' => true,
    'include' => true,
    'increment_style' => ['style' => 'post'],
    'linebreak_after_opening_tag' => true,
    'lowercase_cast' => true,
    'lowercase_static_reference' => true,
    'magic_constant_casing' => true,
    'magic_method_casing' => true,
    'method_argument_space' => ['on_multiline' => 'ensure_fully_multiline'],
    'native_function_casing' => true,
    'native_function_type_declaration_casing' => true,
    'new_with_braces' => true,
    'no_alternative_syntax' => true,
    'no_blank_lines_after_class_opening' => true,
    'no_blank_lines_after_phpdoc' => true,
    'no_empty_phpdoc' => true,
    'no_empty_statement' => true,
    'no_extra_blank_lines' => ['tokens' => ['break', 'continue', 'curly_brace_block', 'extra', 'parenthesis_brace_block', 'return', 'square_brace_block', 'switch', 'throw', 'use', 'use_trait']],
    'no_leading_import_slash' => true,
])
    ->setRiskyAllowed(true)
    ->setFinder($finder);
