<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'success',
    'message' => 'Test file is working',
    'server_info' => [
        'php_version' => PHP_VERSION,
        'server_software' => $_SERVER['SERVER_SOFTWARE'],
        'document_root' => $_SERVER['DOCUMENT_ROOT'],
        'script_filename' => $_SERVER['SCRIPT_FILENAME'],
        'current_dir' => __DIR__,
        'file_permissions' => [
            'api_dir' => substr(sprintf('%o', fileperms(__DIR__)), -4),
            'current_file' => substr(sprintf('%o', fileperms(__FILE__)), -4),
            'env_exists' => file_exists('/home/u421487616/domains/lifehorizonit.com/public_html/.env'),
        ]
    ]
]); 