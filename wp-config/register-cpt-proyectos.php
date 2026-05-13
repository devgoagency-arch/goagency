---
// Copia este snippet en el archivo functions.php de tu tema hijo
// o en un plugin personalizado en WordPress.
// Este código registra el CPT "Proyectos" con soporte para WPGraphQL
// y define los campos ACF compatibles con la estructura esperada por Astro.
---

<?php
/**
 * Registro del CPT "Proyectos" con WPGraphQL habilitado
 * Pegar en functions.php del tema hijo
 */
function go_register_cpt_proyectos() {
    register_post_type('proyectos', [
        'labels' => [
            'name'               => 'Proyectos',
            'singular_name'      => 'Proyecto',
            'add_new'            => 'Añadir nuevo',
            'add_new_item'       => 'Añadir nuevo proyecto',
            'edit_item'          => 'Editar proyecto',
            'all_items'          => 'Todos los proyectos',
        ],
        'public'              => true,
        'has_archive'         => true,
        'rewrite'             => ['slug' => 'proyectos'],
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'menu_icon'           => 'dashicons-portfolio',
        // ↓ CRÍTICO para WPGraphQL
        'show_in_graphql'     => true,
        'graphql_single_name' => 'proyecto',
        'graphql_plural_name' => 'proyectos',
    ]);
}
add_action('init', 'go_register_cpt_proyectos');
