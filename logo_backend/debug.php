<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$v = Illuminate\Support\Facades\Validator::make(
    ['project_id' => 6, 'command' => 'PHONG CÁCH HOẠT HÌNH'],
    [
        'project_id' => 'required|exists:projects,id',
        'command' => 'required|string|max:255',
    ]
);

if ($v->fails()) {
    echo "FAILED:\n";
    print_r($v->errors()->toArray());
} else {
    echo "PASS\n";
}
