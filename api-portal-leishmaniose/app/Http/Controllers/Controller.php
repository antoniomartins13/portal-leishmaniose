<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Laravel OpenApi Documentação",
 *     description="Documentação do ERP Jucese",
 *
 *     @OA\Contact(
 *         email=""
 *     )
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     in="header",
 *     name="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 * ),
 */
class Controller extends BaseController
{
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;
}
